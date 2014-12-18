package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-12.
 */
public class SupplierpageAction extends ActionSupport {
    private int page;
    private int limit;
    private List<TBaSupplierInfo> supplist;
    private int rows;
    private String supplierId;
    @Resource
    private BaseDAO<TBaSupplierInfo> dao;

    public String Supplierlist(){
        if(null!=supplierId){
            supplist = dao.queryForPage("from TBaSupplierInfo u where u.supplierId like\'%" + supplierId + "%\'", page, limit);
            rows = supplist.size();
            return SUCCESS;
        }
        supplist=dao.queryForPage("from TBaSupplierInfo",page,limit);
        rows=dao.listAll(TBaSupplierInfo.class).size();
        return SUCCESS;

    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public List<TBaSupplierInfo> getSupplist() {
        return supplist;
    }

    public void setSupplist(List<TBaSupplierInfo> supplist) {
        this.supplist = supplist;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
}