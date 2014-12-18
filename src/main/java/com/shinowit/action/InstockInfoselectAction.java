package com.shinowit.action;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockInfo;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class InstockInfoselectAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TMeInStockInfo> instocklist;
    private String billCode;
    @Resource
    private BaseDAO<TMeInStockInfo> dao;

    public String select() {
        if(billCode!=null){
            instocklist=dao.queryForPage("from TMeInStockInfo u where u.billCode like'%" + billCode + "%\'", page, limit);
            rows=instocklist.size();
            return SUCCESS;
        }
        instocklist=dao.queryForPage("from TMeInStockInfo order by inTime desc",page,limit);
        rows=dao.listAll(TMeInStockInfo.class).size();
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

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public List<TMeInStockInfo> getInstocklist() {
        return instocklist;
    }

    public void setInstocklist(List<TMeInStockInfo> instocklist) {
        this.instocklist = instocklist;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }
}
