package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfo;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;


import javax.annotation.Resource;
import java.util.List;


/**
 * Created by Administrator on 2014-11-07.
 */
public class OperpageAction extends ActionSupport{
    private static Logger logger= Logger.getLogger(OperpageAction.class);
    private int page;
    private int limit;
    private List<TAuOperInfo> operlist;
    private int rows;
    private String operId;
    @Resource
    private BaseDAO<TAuOperInfo> dao;

    public String Operlist(){
        if(null!=operId){
            operlist = dao.queryForPage("from TAuOperInfo u where u.operId like\'%" + operId + "%\'", page, limit);

            rows = operlist.size();
            return SUCCESS;
        }

        operlist=dao.queryForPage("from TAuOperInfo", page, limit);

        rows=dao.listAll(TAuOperInfo.class).size();
        return SUCCESS;
    }

    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    public List<TAuOperInfo> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfo> operlist) {
        this.operlist = operlist;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
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


}
