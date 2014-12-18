package com.shinowit.action;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.entity.TMeOutStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class OutstockInfoselectAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TMeOutStockInfo> outstocklist;
    private String outBillCode;
    @Resource
    private BaseDAO<TMeOutStockInfo> dao;

    public String select() {
        if(outBillCode!=null){
            outstocklist=dao.queryForPage("from TMeOutStockInfo u where u.outBillCode like'%" + outBillCode + "%\'", page, limit);
            rows=outstocklist.size();
            return SUCCESS;
        }
        outstocklist=dao.queryForPage("from TMeOutStockInfo order by outTime desc",page,limit);
        rows=dao.listAll(TMeOutStockInfo.class).size();
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

    public List<TMeOutStockInfo> getOutstocklist() {
        return outstocklist;
    }

    public void setOutstocklist(List<TMeOutStockInfo> outstocklist) {
        this.outstocklist = outstocklist;
    }

    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }
}
